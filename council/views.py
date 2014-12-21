from django.shortcuts import render
from django.http import HttpResponseRedirect


from council.models import Councilmember, Term
from council.forms import LastNameForm

def all_councilmembers(request):
    """
    Simple view to show all councilmembers' info on a page
    """
    members = Term.objects.all().order_by('councilperson_id__last_name')
    page = "council/all_members.html"
    return render(request, page, {'members':members})

