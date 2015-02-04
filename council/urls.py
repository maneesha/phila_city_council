from django.conf.urls import patterns, url

from council import views, old_views

#Urls defined here are then called by urls.py in parent project 
urlpatterns = patterns('',
    #Go to views from council (imported above)
    #Get the view called "index"
    #Call it when the url ends nothing (regex = ^$)
    url(r'^$', views.index, name='index'),
    # url(r'^simple_search_form$', old_views.simple_search_form, name="simple_search_form"),
    # url(r'^simple_search_results$', old_views.simple_search_results, name="simple_search_results"),
    url(r'^all_councilmembers$', views.all_councilmembers, name='all_councilmembers'),
    url(r'^unique_councilmembers$', views.unique_councilmembers, name='unique_councilmembers'),
    url(r'^demographic_breakdown$', views.demographic_breakdown, name="demographic_breakdown"),
    url(r'^departed$', views.departed, name='departed'),
    url(r'^timeline$', views.timeline, name='timeline'),
    url(r'^demographics_stacked_bar$', views.demographics_stacked_bar, name="stacked-bar"),
    url(r'^maps$', views.demographic_maps, name="demographic_maps"),
    #Remember the trailing comma

    )