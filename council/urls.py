from django.conf.urls import patterns, url

from council import views, old_views

#Urls defined here are then called by urls.py in parent project 
urlpatterns = patterns('',
    #Go to views from council (imported above)
    #Get the view called "index"
    #Call it when the url ends nothing (regex = ^$)
    url(r'^$', old_views.index, name='index'),
    url(r'^simple_search_form$', old_views.simple_search_form, name="simple_search_form"),
    url(r'^simple_search_results$', old_views.simple_search_results, name="simple_search_results"),
    url(r'^all_councilmembers$', views.all_councilmembers, name='all_councilmembers'),
    #Remember the trailing comma

    )