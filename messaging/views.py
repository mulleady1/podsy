from django.shortcuts import render
from django.views.generic import View
from django.db.models import Q

from messaging.models import *
from podsy.views import getuser, Json, JsonAuthErr

import json

class MessageView(View):

    def get(self, request, message_id=None):
        odata = []
        u = getuser(request)
        if message_id:
            odata = Message.objects.get(message_id).data
        elif u:
            messages = Message.objects.filter(Q(from_user=u) | Q(to_user=u))
            for message in messages:
                odata.append(message.data)

        return Json(odata)

    def post(self, request):
        idata = json.loads(request.body)
        odata = {}
        to_user = idata.get('toUser')
        text = idata.get('text')
        u = getuser(request)
        if not u:
            return JsonAuthErr()
        if not (to_user and text):
            return Json({ 'message': 'Please fill in all fields.' })
        message = Message.objects.create(from_user=getuser(request), to_user=to_user, text=text)
        return Json(message.data)
