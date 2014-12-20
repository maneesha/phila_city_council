from django.shortcuts import render
from django.http import HttpResponse
from council.models import Councilmember

# Create your views here.

#Sample view with hardcoded html. Not for real.  Called in council/urls.py
# def index(request):
#     return HttpResponse('Hello world. THis is my page. Enjoy.')

#Make the view actually do something - print alpha list of all councilmembers
#BUT html is hardcoded in view - we want to separate this into a template
def index(request):
    ordered_list = Councilmember.objects.order_by('last_name')
    output = "<br>".join([p.last_name + " " + p.first_name for p in ordered_list])
    return HttpResponse(output)
