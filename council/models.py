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

    def __str__(self):
        return '%s %s %s %s %s %s %s %s' % (self.first_name, self.middle_name, self.last_name, self.suffix, self.gender, self.race, self.birthdate, self.notes)


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

    def __str__(self):
        return '%s %s %s %s %s %s %s %s %s %s %s' % (self.departed, self.departed_notes, self.district, self.party, self.actual_start_date, self.actual_start_date_confirmed, self.actual_end_date, self.actual_end_date_confirmed, self.effective_end_year, self.effective_start_year, self.notes)

# When it's time to add choices to fields:
#     MALE = 'M'
#     FEMALE = 'F'
#     GENDER_CHOICES = ((MALE, 'M'), (FEMALE, 'F'))
#     gender = models.CharField(max_length = 1, choices = GENDER_CHOICES)