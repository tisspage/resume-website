#!/usr/bin/env python
# encoding: utf-8
"""
urls.py

Created by Christophe VAN FRACKEM on 2014/05/25/.
Copyright (c) 2014 Tiss'Page. All rights reserved.

"""
__author__ = 'Christophe VAN FRACKEM <contact@tisspage.fr>'
__version__= '0.0.1'
__copyright__ = '© 2014 Tiss\'Page'

from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
import local, settings

from website.views import PageView, MentionsView

urlpatterns = patterns('',
			
    # Examples:
	url(r'^$', PageView.as_view()),
	url(r'^mentions-legales$', MentionsView.as_view()),



    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:

) + static(local.MEDIA_URL, document_root=local.MEDIA_ROOT) + \
static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
