from django import forms

class LastNameForm(forms.Form):
    last_name = forms.CharField(label="Last Name: ", max_length=20)

    