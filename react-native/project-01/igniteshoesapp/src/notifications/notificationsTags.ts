import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email);
}

export function tagUserEmailDelete() {
  OneSignal.deleteTag('user_email');
}