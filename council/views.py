from django.shortcuts import render
from django.http import HttpResponseRedirect

from django_tables2   import RequestConfig
from council.tables import MemberTable


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

