#!/usr/bin/env python
# encoding: utf-8
"""
views.py

Created by Christophe VAN FRACKEM on 2014/05/25.
Copyright (c) 2014 Tiss'Page. All rights reserved.

"""
__author__ = 'Christophe VAN FRACKEM <contact@tisspage.fr>'
__version__= '0.0.1'
__copyright__ = '© 2014 Tiss\'Page'


from django.shortcuts import render_to_response
from django.views.generic import View, TemplateView, FormView, UpdateView
from django.http import HttpResponseRedirect, HttpResponse
from django.core.mail import send_mail, BadHeaderError
from django.core.mail import EmailMultiAlternatives
from django.contrib import messages



from website.forms import ContactForm

class ContactFormView(FormView):
	form_class=ContactForm
	success_url = '/'

	def get_context_data(self, **kwargs):
		context = super(ContactFormView, self).get_context_data(**kwargs)
		context.update(form=ContactForm()
		               )
		return context

	def form_valid(self, form):
		subject = u'Contact via le site tisspage.fr'
		from_email = 'contact@tisspage.fr'
		to = 'contact@tisspage.fr'

		text_content = 'Un internaute vient de vous contacter via le formulaire de contact de votre site Internet.'

		html_content = 'Un internaute vient de vous contacter via le formulaire de contact de votre site Internet.<br><br>'
		html_content += u'<strong>Son email :</strong><a href="mailto:{email}"> {email}</a><br>'.format(email=form.cleaned_data.get('email'))
		html_content += u'<strong>Son message :</strong> <br>{message}'.format(message=form.cleaned_data.get('message'))

		msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
		msg.attach_alternative(html_content, "text/html")
		msg.send()
		messages.add_message(self.request, messages.INFO, 'Votre message a bien été envoyé. Je vous contacterai dans les plus brefs délais.')
		return HttpResponseRedirect(self.get_success_url())

class PageView(ContactFormView, FormView):
    template_name="index.html"

class MentionsView(ContactFormView, FormView):
    template_name="mentions.html"
    
