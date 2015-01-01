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

    #For most years this will actually need a start & end value, to come from html GET
    #This will be used to get race, gender, & party numbers
    active_in_2014 = Term.objects.filter(actual_end_date__gte='2014')

    #Now comes some rather redundant stuff where we do the same thing to get race, gender, and party data

    #FIRST BY RACE
    members_by_race = active_in_2014.values('councilperson_id_id__race').annotate(Count('councilperson_id_id'))

    councilmember_names_by_race = members_by_race.values('councilperson_id_id__first_name', 'councilperson_id_id__last_name', 'councilperson_id_id__race')

    race_list = []  #This is the list that will eventually passed to json

    for member_by_race in members_by_race:
        race_temp_list = []
        for i in councilmember_names_by_race:

            if i['councilperson_id_id__race'] == member_by_race['councilperson_id_id__race']:
                race_temp_list.append(i['councilperson_id_id__first_name'] + " " + i['councilperson_id_id__last_name'])

            #Add that temp list to the member dict
            member_by_race['allnames'] = race_temp_list
        #Add the updated member dict to race_list
        race_list.append(member_by_race)


    #NEXT BY GENDER
    members_by_gender = active_in_2014.values('councilperson_id_id__gender').annotate(Count('councilperson_id_id'))

    councilmember_names_by_gender = members_by_gender.values('councilperson_id_id__first_name', 'councilperson_id_id__last_name', 'councilperson_id_id__gender')

    gender_list = []  #This is the list that will eventually passed to json

    for member_by_gender in members_by_gender:
        gender_temp_list = []
        for i in councilmember_names_by_gender:

            if i['councilperson_id_id__gender'] == member_by_gender['councilperson_id_id__gender']:
                gender_temp_list.append(i['councilperson_id_id__first_name'] + " " + i['councilperson_id_id__last_name'])

            #Add that temp list to the member dict
            member_by_gender['allnames'] = gender_temp_list
        #Add the updated member dict to race_list
        gender_list.append(member_by_gender)




    page = "council/demographic_breakdown.html"

    return render(request, page, {'race_list':race_list, 'gender_list':gender_list})
