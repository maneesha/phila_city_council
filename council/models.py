from django.db import models

class Councilmember(models.Model):
    first_name = models.CharField(max_length=25)
    middle_name = models.CharField(max_length=25, blank=True, null=True)
    last_name = models.CharField(max_length=25)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=1)
    race = models.CharField(max_length = 25, blank=True, null=True)
    birthdate = models.CharField(max_length = 25, blank=True, null=True)
    notes = models.CharField(max_length = 250, blank=True, null=True) 

class Term(models.Model):
    predecessor_id = models.ForeignKey('Councilmember', related_name="predecessor")
    councilperson_id = models.ForeignKey('Councilmember', related_name="councilperson")
    successor_id = models.ForeignKey('Councilmember', related_name="successor")
    departed = models.CharField(max_length = 20)
    departed_notes = models.CharField(max_length = 250, blank=True, null=True)
    district = models.IntegerField()
    party = models.CharField(max_length = 15, blank=True, null=True)
    actual_start_date = models.CharField(max_length = 25, blank=True, null=True)
    actual_start_date_confirmed = models.BooleanField()
    actual_end_date = models.CharField(max_length = 25, blank=True, null=True)
    actual_end_date_confirmed = models.BooleanField()
    effective_start_year = models.IntegerField(blank=True, null=True)
    effective_end_year = models.IntegerField(blank=True, null=True)
    notes = models.CharField(max_length = 250, blank=True, null=True) 