from django.shortcuts import render
from django.http import HttpResponseRedirect


from council.models import Councilmember, Term
from council.forms import LastNameForm

#Contains views written for educational purposes.  Not used in app

#Needed in older versions of view:
#from django.http import HttpResponse
#from django.template import RequestContext, loader

#Sample view with hardcoded html. Not for real.  Called in council/urls.py
# def index(request):
#     return HttpResponse('Hello world. THis is my page. Enjoy.')

#Make the view actually do something - print alpha list of all councilmembers
#BUT html is hardcoded in view - we want to separate this into a template
# def index(request):
#     ordered_list = Councilmember.objects.order_by('last_name')
#     output = "<br>".join([p.last_name + " " + p.first_name for p in ordered_list])
#     return HttpResponse(output)

#Try this by calling on an html template
# def index(request):
#     ordered_list = Councilmember.objects.order_by('last_name')
#     template = loader.get_template('council/index.html')
#     context = RequestContext(request, {'ordered_list':ordered_list,})
#     return HttpResponse(template.render(context))

#Rewrite the view by simplifying the template call
def index(request):
    ordered_list = Councilmember.objects.order_by('first_name')
    context = {'ordered_list':ordered_list}
    return render(request, 'council/index.html', context)


def simple_search_results(request):
    """
    This takes the user input from an html form defined in simple_search_form and uses it to query the database.
    Query results are passed to an html results page.
    """
    if request.method == 'GET':
        #This is the form that was defined in forms.py
        form = LastNameForm(request.GET)

        if form.is_valid(): 
            #if the form is valid, get whatever was inputted by user in last name field
            last_name = request.GET['last_name']
            #query Councilmember for objects where last_name begins with query
            #Note the syntax for a join query:
            #Term model, councilperson_id is field to join on, last_name is being queried
            last_name_list = Term.objects.filter(councilperson_id__last_name__startswith=last_name)
            #if the search was ok, here's the search results page
            page = 'council/simple_search_results.html' 
            #render search results page passing in this dict
            return render(request, page, {'last_name':last_name, 'last_name_list':last_name_list})
    else:
        form = LastNameForm()
    return render(request, 'council/simple_search_form.html', {'form':form}) 
    #if search wasn't ok go back to search form

def simple_search_form(request):
    form = LastNameForm()
    return render(request, 'council/simple_search_form.html', {'form':form})
    #django doesn't do anything with this page - the search_results view gets data from this page