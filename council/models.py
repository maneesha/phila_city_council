from django.db import models

class Councilmember(models.Model):
    first_name = models.CharField(max_length=25)
    middle_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    suffix = models.CharField(max_length=10)
    gender = models.CharField(max_length=1)
    race = models.CharField(max_length = 25)
    birthdate = models.DateTimeField()
    notes = models.CharField(max_length = 250) 

class Term:
    predecessor_id = models.ForeignKey('Councilmember', predecessor)
    councilperson_id = models.ForeignKey('Councilmember', councilperson)
    successor_id = models.ForeignKey('Councilmember', successor)
    departed = models.CharField(max_length = 20)
    departed_notes = models.CharField(max_length = 250)
    district = models.IntegerField()
    party = models.CharField(max_length = 15)
    actual_start_date = models.DateTimeField()
    actual_start_date_confirmed = models.BooleanField()
    actual_end_date = models.DateTimeField()
    actual_end_date_confirmed = models.BooleanField()
    effective_start_year = models.IntegerField()
    effective_end_year = models.IntegerField()
    notes = models.CharField(max_length = 250) 