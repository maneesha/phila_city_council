from django.shortcuts import render
from django.http import HttpResponseRedirect


from council.models import Councilmember, Term
from council.forms import LastNameForm

def all_councilmembers(request):
    members = Term.objects.all()
    page = "council/all_members.html"
    return render(request, page, {'members':members})

