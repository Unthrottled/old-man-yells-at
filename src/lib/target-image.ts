import { nanoid } from "nanoid";

// Default target images for common scenarios
import phoneImageUrl from "../assets/targets/phone.png";

export const DEFAULT_TARGET_SIZE = 80;

export function getDefaultTargetImage(imageUrl?: string, label?: string): TargetImage {
  return {
    id: nanoid(),
    direction: "right",
    coordinates: {
      x: 200, // Position to the right of where old man will be
      y: 100,
    },
    flipHorizontally: false,
    flipVertically: false,
    isSelected: false,
    imageUrl: imageUrl || phoneImageUrl,
    label: label || "Phone",
    size: {
      width: DEFAULT_TARGET_SIZE,
      height: DEFAULT_TARGET_SIZE,
    },
  };
}

export const TARGET_CATEGORIES = {
  technology: {
    label: "📱 Technology",
    items: [
      { imageUrl: "/src/assets/targets/phone.png", label: "Phone", description: "Smartphones and their notifications" },
      { imageUrl: "/src/assets/targets/computer.png", label: "Computer", description: "Slow computers and updates" },
      { imageUrl: "/src/assets/targets/tablet.png", label: "Tablet", description: "Touch screens and apps" },
      { imageUrl: "/src/assets/targets/wifi.png", label: "WiFi", description: "Slow internet connection" },
      { imageUrl: "/src/assets/targets/tv.png", label: "TV", description: "Too many channels, nothing good" },
      { imageUrl: "/src/assets/targets/robot.png", label: "Robot", description: "Automation taking over" },
    ]
  },
  weather: {
    label: "🌦️ Weather", 
    items: [
      { imageUrl: "/src/assets/targets/cloud.png", label: "Clouds", description: "Blocking the sun" },
      { imageUrl: "/src/assets/targets/rain.png", label: "Rain", description: "Ruining outdoor plans" },
      { imageUrl: "/src/assets/targets/snow.png", label: "Snow", description: "Too much shoveling" },
      { imageUrl: "/src/assets/targets/sun.png", label: "Sun", description: "Too hot and bright" },
      { imageUrl: "/src/assets/targets/wind.png", label: "Wind", description: "Blowing things around" },
      { imageUrl: "/src/assets/targets/storm.png", label: "Storm", description: "Loud thunder and lightning" },
    ]
  },
  people: {
    label: "👥 People",
    items: [
      { imageUrl: "/src/assets/targets/kids.png", label: "Kids", description: "Get off my lawn!" },
      { imageUrl: "/src/assets/targets/teenagers.png", label: "Teenagers", description: "Loud music and skateboarding" },
      { imageUrl: "/src/assets/targets/neighbors.png", label: "Neighbors", description: "Noisy and inconsiderate" },
      { imageUrl: "/src/assets/targets/delivery.png", label: "Delivery Person", description: "Wrong address again" },
      { imageUrl: "/src/assets/targets/salesperson.png", label: "Salesperson", description: "Unwanted solicitation" },
      { imageUrl: "/src/assets/targets/politician.png", label: "Politician", description: "Empty promises" },
    ]
  },
  objects: {
    label: "🚗 Objects",
    items: [
      { imageUrl: "/src/assets/targets/car.png", label: "Car", description: "Traffic and bad drivers" },
      { imageUrl: "/src/assets/targets/building.png", label: "Building", description: "Construction noise" },
      { imageUrl: "/src/assets/targets/tree.png", label: "Tree", description: "Leaves in the yard" },
      { imageUrl: "/src/assets/targets/lawnmower.png", label: "Lawnmower", description: "Won't start when needed" },
      { imageUrl: "/src/assets/targets/mailbox.png", label: "Mailbox", description: "Bills and junk mail" },
      { imageUrl: "/src/assets/targets/garbage.png", label: "Garbage", description: "Pickup day confusion" },
    ]
  },
  modern: {
    label: "🆕 Modern Life",
    items: [
      { imageUrl: "/src/assets/targets/social-media.png", label: "Social Media", description: "Kids on their phones" },
      { imageUrl: "/src/assets/targets/selfie-stick.png", label: "Selfie Stick", description: "Narcissistic behavior" },
      { imageUrl: "/src/assets/targets/drone.png", label: "Drone", description: "Privacy invasion" },
      { imageUrl: "/src/assets/targets/electric-scooter.png", label: "E-Scooter", description: "Cluttering sidewalks" },
      { imageUrl: "/src/assets/targets/cryptocurrency.png", label: "Cryptocurrency", description: "Confusing digital money" },
      { imageUrl: "/src/assets/targets/influencer.png", label: "Influencer", description: "Fake lifestyle promotion" },
    ]
  },
  animals: {
    label: "🐕 Animals",
    items: [
      { imageUrl: "/src/assets/targets/dog.png", label: "Dog", description: "Barking at all hours" },
      { imageUrl: "/src/assets/targets/cat.png", label: "Cat", description: "In the garden again" },
      { imageUrl: "/src/assets/targets/squirrel.png", label: "Squirrel", description: "Stealing bird food" },
      { imageUrl: "/src/assets/targets/bird.png", label: "Bird", description: "Chirping too early" },
      { imageUrl: "/src/assets/targets/raccoon.png", label: "Raccoon", description: "Getting into trash" },
      { imageUrl: "/src/assets/targets/deer.png", label: "Deer", description: "Eating the garden" },
    ]
  }
};

export function getTargetImageByCategory(category: string, item: string): TargetImage {
  const categoryData = TARGET_CATEGORIES[category as keyof typeof TARGET_CATEGORIES];
  const targetItem = categoryData?.items.find(i => i.label === item);
  
  if (targetItem) {
    return getDefaultTargetImage(targetItem.imageUrl, targetItem.label);
  }
  
  return getDefaultTargetImage();
}

export function getRandomTarget(): TargetImage {
  const categories = Object.keys(TARGET_CATEGORIES);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryData = TARGET_CATEGORIES[randomCategory as keyof typeof TARGET_CATEGORIES];
  const randomItem = categoryData.items[Math.floor(Math.random() * categoryData.items.length)];
  
  return getDefaultTargetImage(randomItem.imageUrl, randomItem.label);
}
