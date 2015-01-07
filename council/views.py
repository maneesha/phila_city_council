from django.shortcuts import render
from django.http import HttpResponseRedirect

from django_tables2   import RequestConfig
from council.tables import MemberTable

from django.db.models import Count


import json
from django.core import serializers

from council.models import Councilmember, Term
from council.forms import LastNameForm

def index(request):
    """
    Landing page
    """
    return render(request, 'council/index.html')

def all_councilmembers(request):
    """
    Simple view to show all councilmembers' info on a page
    """
    #This is how I'd get the object if I was making the table myself
    #members = Term.objects.all()#.order_by('councilperson_id__last_name')
    members = MemberTable(Term.objects.all())
    RequestConfig(request, paginate={"per_page": 100}).configure(members)
    page = "council/all_members.html"
    return render(request, page, {'members':members})

def unique_councilmembers(request):
    """
    Used to create page showing how many unique councilmembers each district has had.
    """

    #Note: This is same as this sql statement:
    #select distinct councilperson_id_id, district from council_term where actual_end_date > '1979' order by district;
    members_since_80 = Term.objects.filter(actual_end_date__gte='1980')
    members_since_80 = members_since_80.filter(district__gte=1)
    members = members_since_80.values('district').annotate(Count('councilperson_id_id'))

    #get names by district
    names_by_district = members_since_80.values('councilperson_id_id__first_name', 'councilperson_id_id__last_name', 'district').order_by('actual_end_date')


    unique_list = []  #This is the list that will eventually passed to json

    for member in members:
        temp_list = []
        for i in names_by_district:
            if i['district'] == member['district']:
                #Add names for that district to a temp list
                temp_list.append(i['councilperson_id_id__first_name'] + " " + i['councilperson_id_id__last_name'])
            #Add that temp list to the member dict
            member['allnames'] = temp_list
        #Add the updated member dict to unique_list
        unique_list.append(member)

    page = "council/unique_councilmembers.html"
    return render(request, page, {'members':members,'unique_list':unique_list})


def demographic_breakdown(request):
    """
    Used to create pie charts showing demographic makeup of city council
    """
    race_list = party_list = gender_list = message = search = None


    if request.GET.get('search'): #check to see if there was any input
        try:  #Try this 
            search = int(request.GET.get('search')) #if it can't be converted to int, ValueError exception below

            if 1980 <= search <= 2015: #if date falls in range, else return message below

                #Filter for all councilmembers active that year (started before/equal & ended after/equal)
                active_in_year = Term.objects.filter(effective_end_year__gte=search).filter(effective_start_year__lte=search)

                def members_by_demographic(model_field_name):
                    query = active_in_year.values(model_field_name).annotate(Count('councilperson_id_id'))
                    query_with_names = query.values('councilperson_id_id__first_name', 'councilperson_id_id__last_name', model_field_name)

                    demographic_list = []

                    for q in query:
                        demographic_temp_list = []
                        for i in query_with_names:
                            if i[model_field_name] == q[model_field_name]:
                                demographic_temp_list.append((i['councilperson_id_id__first_name'] + " " + i['councilperson_id_id__last_name']))
                            q['allnames'] = demographic_temp_list
                        demographic_list.append(q)

                    return query, query_with_names, demographic_list


                members_by_race, councilmember_names_by_race, race_list = members_by_demographic('councilperson_id_id__race')

                members_by_gender, councilmember_names_by_gender, gender_list = members_by_demographic('councilperson_id_id__gender')

                members_by_party, councilmember_names_by_party, party_list = members_by_demographic('party')

            else: #if date is not in range 1980-2015
                search = None
                message = "Year must be a four digit number between 1980 and 2015. Please try again."

        except ValueError:
            search = None
            message = "Year must be a four digit number between 1980 and 2015. Please try again."

    page = "council/demographic_breakdown.html"

    return render(request, page, {'race_list':race_list, 'gender_list':gender_list, 'party_list':party_list, 'search':search, 'message':message})


def departed(request):

    members_since_80 = Term.objects.filter(actual_end_date__gte='1980').filter(departed__in=["defeated", "died", "resigned", "retired", "scandal"])

    members = members_since_80.values('departed').annotate(Count('councilperson_id_id'))

    #get names by departed
    names_by_departed = members_since_80.values('councilperson_id_id__first_name', 'councilperson_id_id__last_name', 'departed').order_by('actual_end_date')



    departed_list = []  #This is the list that will eventually passed to json

    for member in members:
        temp_list = []
        for i in names_by_departed:
            if i['departed'] == member['departed']:
                #Add names for that departed to a temp list
                temp_list.append(i['councilperson_id_id__first_name'] + " " + i['councilperson_id_id__last_name'])
            #Add that temp list to the member dict
            member['allnames'] = temp_list
        #Add the updated member dict to unique_list
        departed_list.append(member)


    page = "council/departed.html"


    return render(request, page, {'members':members, 'departed_list':departed_list})


def timeline(request):
    members_since_80 = Term.objects.filter(actual_end_date__gte='1980').filter(district__gte=1)
    members = members_since_80.values("district", "actual_end_date", "actual_start_date", "departed", 'councilperson_id_id__first_name', 'councilperson_id_id__last_name')
    members = list(members)

    page = "council/timeline.html"
    return render(request, page, {'members':members})


def demographics_stacked_bar(request):
    active_1984 = Term.objects.filter(effective_end_year__gte=1984)
    variables = {'active_1984':active_1984}

    page = "council/demographics-bar.html"
    return render(request, page, variables)
    