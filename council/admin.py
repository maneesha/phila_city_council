from django.contrib import admin
from council.models import Councilmember, Term


class TermInline(admin.TabularInline):
    #Docs on how to do this:
    #https://docs.djangoproject.com/en/1.7/ref/contrib/admin/#working-with-a-model-with-two-or-more-foreign-keys-to-the-same-parent-model
    model = Term #what model does this class refer to?
    fk_name = "councilperson_id" #what field in this model is used for foreign key? (as there are multiple foriegn keys)
    fields = ('predecessor_id', 'successor_id', 'district', 'actual_start_date', 'actual_end_date')#what fields should display
    extra = 0 #should blank rows for any extra fields display?

class CouncilmemberAdmin(admin.ModelAdmin):
    #What fields should display on the master list
    list_display = ('last_name','first_name', 'birthdate', 'race', 'gender')
    #set default sort order
    ordering = ('last_name', 'first_name')
    #What class to determine rows that follow
    inlines = [TermInline]

admin.site.register(Councilmember, CouncilmemberAdmin)
admin.site.register(Term)


