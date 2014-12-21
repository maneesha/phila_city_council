from django.shortcuts import render
from django.http import HttpResponseRedirect


from council.models import Councilmember, Term
from council.forms import LastNameForm


