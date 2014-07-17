#!/usr/bin/env python
# encoding: utf-8
"""

Created by Christophe VAN FRACKEM on 2014/06 pour Keep-Protect
Contenu sous licence CC BY-NC-SA 3.0

"""
__author__ = 'Christophe VAN FRACKEM <contact@tisspage.fr>'
__version__= '1.0'
__copyright__ = '2014 - Contenu sous licence CC BY-NC-SA 3.0'

from django import forms


class ContactForm(forms.Form):
	email = forms.CharField(max_length='255', 
							widget=forms.TextInput(attrs={'class':'textfield', 'placeholder':'Votre adresse email'}),
							label = "E-mail")
	message = forms.CharField(max_length='255', 
							widget=forms.Textarea(attrs={'class':'textarea', 'placeholder':'Votre message'}),
							label = "Message")

	