import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email);
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Felipe',
    'user_email': 'felipe@email.com'
  });
}

export function tagUserEmailDelete() {
  OneSignal.deleteTag('user_email');
}
  
export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount);
}