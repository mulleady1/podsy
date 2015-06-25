from django.shortcuts import render
from django.views.generic import View
from django.db.models import Q

from messaging.models import *
from podsy.views import getuser, Json, JsonAuthErr

import json

class ConversationView(View):

    def get(self, request, conversation_id=None):
        odata = []
        u = getuser(request)
        if conversation_id:
            odata = Conversation.objects.get(conversation_id).data
        elif u:
            conversations = Conversation.objects.filter(members=u)
            for conversation in conversations:
                odata.append(conversation.data)

        return Json(odata)


class MessageView(View):

    def get(self, request, message_id=None):
        pass

    def post(self, request, conversation_id):
        idata = json.loads(request.body)
        odata = {}
        text = idata.get('text')
        u = getuser(request)
        if not u:
            return JsonAuthErr()
        if not text:
            return Json({ 'message': 'Please fill in all fields.' })
        message = Message.objects.create(conversation_id=conversation_id, user=u, text=text)
        return Json(message.data)
