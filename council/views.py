from django.shortcuts import render
from django.http import HttpResponseRedirect

from django_tables2   import RequestConfig
from council.tables import MemberTable

from django.db.models import Count


import json
from django.core import serializers

from council.models import Councilmember, Term
from council.forms import LastNameForm

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
    members = Term.objects.filter(actual_end_date__gte='1980')
    members = members.filter(district__gte=1)
    members = members.values('district').annotate(Count('councilperson_id_id'))

    unique_list = []

    k = 0

    for member in members:
        print(member)
        print(type(member))
        #will need to do something like this to get councilmember names in this dataset
        member[k+1] = k+2
        k+=5
        unique_list.append(member)

    json_members = json.dumps(unique_list)

    page = "council/unique_councilmembers.html"
    return render(request, page, {'members':members,'json_members':json_members})
