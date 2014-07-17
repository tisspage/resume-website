#!/usr/bin/env python
# encoding: utf-8
"""
manage.py

Created by Christophe VAN FRACKEM on 2014/02/02/.
Copyright (c) 2014 Tiss'Page. All rights reserved.

"""
__author__ = 'Christophe VAN FRACKEM <contact@tisspage.fr>'
__version__= '0.0.1'
__copyright__ = '© 2014 Tiss\'Page'

import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
