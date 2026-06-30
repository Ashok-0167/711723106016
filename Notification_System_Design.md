The app stores the filter in App.jsx and then sends it to NotificationFilter. This NotificationFilter is a part of the app that can be controlled. It uses the value and the onChange. When a user chooses a filter the app updates its state. Then the notifications that are shown are updated too.

The app should really do the filtering or a separate thing called NotificationList should do it. It should not happen in the filter control itself.

We should use groups like All, Unread, Messages and System. The user interface should be styled with things, like.filters.box and.active for the filter that is chosen.
