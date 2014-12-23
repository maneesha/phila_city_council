import django_tables2 as tables 
from council.models import Councilmember, Term

class MemberTable(tables.Table):
    class Meta:
        model = Term
        attrs = {"class":"paleblue"}
        fields = ('councilperson_id.first_name','councilperson_id.last_name', 'councilperson_id.birthdate','councilperson_id.race', 'councilperson_id.gender','party', 'district', 'actual_start_date', 'actual_end_date', 'departed')

