from django.conf.urls import patterns, url

from council import views

#Urls defined here are then called by urls.py in parent project 
urlpatterns = patterns('',
    #Go to views from council (imported above)
    #Get the view called "index"
    #Call it when the url ends nothing (regex = ^$)
    url(r'^$', views.index, name='index'),
    #Remember the trailing comma

    )