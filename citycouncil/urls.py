from django.conf.urls import patterns, include, url
from django.contrib import admin

#needed to add this line (back? was it removed?)
#otherwise I couldn't log in.
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'citycouncil.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    #Include the urls defined in council.urls
    url(r'^', include('council.urls')),
  
    #Remember the trailing comma
)
