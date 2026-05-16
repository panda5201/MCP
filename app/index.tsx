import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system/legacy'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { supabase } from '../utils/supabase'

// ─── Notification Handler ────────────────────────────────────────────────────
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

// ─── Setup Notification Permission & Channel ─────────────────────────────────
async function setupNotificationsAsync(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Notification permission is required!')
    }
  }
}

// ─── Send Local Notification ──────────────────────────────────────────────────
async function sendLocalNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null, // fire immediately
  })
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Index() {
  const [image, setImage] = useState<string | null>(null)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setupNotificationsAsync()
  }, [])

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera permission is required!')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permission required', 'Gallery permission is required!')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required!')
      return
    }
    const loc = await Location.getCurrentPositionAsync({})
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    })
    Alert.alert(
      'Location obtained',
      `Lat: ${loc.coords.latitude}\nLong: ${loc.coords.longitude}`
    )
  }

  const uploadToSupabase = async () => {
    if (!image) {
      Alert.alert('No image', 'Please take or pick a photo first!')
      return
    }
    if (!location) {
      Alert.alert('No location', 'Please get your location first!')
      return
    }

    try {
      setUploading(true)

      // 1. Baca file sebagai base64
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: 'base64',
      })

      // 2. Decode base64 ke ArrayBuffer pakai base64-arraybuffer
      const arrayBuffer = decode(base64)

      // 3. Buat nama file unik
      const fileName = `photo-${Date.now()}.jpg`
      const filePath = `camera/${fileName}`

      // 4. Upload ke Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .upload(filePath, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        })

      if (storageError) throw storageError

      // 5. Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      const imageUrl = publicUrlData.publicUrl

      // 6. Insert record ke tabel photo
      const { error: insertError } = await supabase.from('photo').insert([
        {
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
          image_url: imageUrl,
        },
      ])

      if (insertError) throw insertError

      // 7. ✅ Notifikasi sukses — sertakan latitude & longitude
      await sendLocalNotification(
        '✅ Upload Berhasil',
        `Data berhasil disimpan ke Supabase.\nLat: ${location.latitude.toFixed(6)}\nLong: ${location.longitude.toFixed(6)}`
      )

      Alert.alert('Success', 'Photo and location saved to Supabase!')
    } catch (error: any) {
      // 8. ❌ Notifikasi gagal — sertakan latitude & longitude jika tersedia
      const coordInfo = location
        ? `\nLat: ${location.latitude.toFixed(6)}\nLong: ${location.longitude.toFixed(6)}`
        : ''

      await sendLocalNotification(
        '❌ Upload Gagal',
        `Gagal menyimpan data ke Supabase.${coordInfo}\nError: ${error.message ?? 'Unknown error'}`
      )

      Alert.alert('Error', error.message ?? 'Failed to upload data.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Week 12 — Camera + Location + Supabase + Notifications</Text>

      <View style={styles.buttonRow}>
        <Button title="📷 Open Camera" onPress={openCamera} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="🖼️ Open Gallery" onPress={openGallery} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="📍 Get Location" onPress={getLocation} />
      </View>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>Lat: {location.latitude.toFixed(6)}</Text>
          <Text style={styles.locationText}>Long: {location.longitude.toFixed(6)}</Text>
        </View>
      )}

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <View style={styles.buttonRow}>
        {uploading ? (
          <ActivityIndicator size="large" color="#0070f3" />
        ) : (
          <Button title="☁️ Upload to Supabase" onPress={uploadToSupabase} color="#0070f3" />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  buttonRow: {
    marginVertical: 6,
    width: 220,
  },
  locationBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#0369a1',
  },
  image: {
    width: 260,
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
})
