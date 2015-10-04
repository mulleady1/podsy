from django.contrib.auth.models import User
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

    def post(self, request):
        idata = json.loads(request.body)
        odata = {}
        username = idata.get('members')[0]['username']
        otherUser = User.objects.get(username=username)
        member = PodsyUser.objects.get(user=otherUser)
        u = getuser(request)
        if not u:
            return JsonAuthErr()
        if not member:
            return Json({ 'message': 'A conversation needs at least two participants.' })

        conv = Conversation.objects.create()
        conv.members.add(u)
        conv.members.add(member)

        return Json(conv.data)

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

class ContactView(View):

    def post(self, request):
        idata = json.loads(request.body)
        odata = {}
        try:
            name = idata.get('name')
            email = idata.get('email')
            if not type(email) in (str, unicode) or email.strip() == '':
                raise Exception('Invalid email.')
            subject = idata.get('subject')
            if not type(subject) in (str, unicode) or subject.strip() == '':
                raise Exception('Please select a subject.')
            message = idata.get('message')
            if not type(message) in (str, unicode) or message.strip() == '':
                raise Exception('Please write a message.')
            podsyMsg = PodsyMessage(name=name, email=email, subject=subject, message=message)
            u = getuser(request)
            if u:
                podsyMsg.user = u

            podsyMsg.save()
            odata['success'] = True
        except Exception as e:
            odata['success'] = False
            odata['message'] = e.message

        return Json(odata)
