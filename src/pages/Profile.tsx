import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Shield, Dumbbell } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [nutritionGoal, setNutritionGoal] = useState('maintain');
  const [name, setName] = useState(user?.name || '');

  const handleUpdateProfile = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const currentPassword = (event.currentTarget.elements.namedItem('current-password') as HTMLInputElement).value;
    const newPassword = (event.currentTarget.elements.namedItem('new-password') as HTMLInputElement).value;
    const confirmPassword = (event.currentTarget.elements.namedItem('confirm-password') as HTMLInputElement).value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  const calculateNutritionRecommendations = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let caloriesMultiplier;
    switch (activityLevel) {
      case 'sedentary': caloriesMultiplier = 1.2; break;
      case 'light': caloriesMultiplier = 1.375; break;
      case 'moderate': caloriesMultiplier = 1.55; break;
      case 'very': caloriesMultiplier = 1.725; break;
      case 'extra': caloriesMultiplier = 1.9; break;
      default: caloriesMultiplier = 1.2;
    }

    let calories = bmr * caloriesMultiplier;

    switch (nutritionGoal) {
      case 'lose': calories -= 500; break;
      case 'gain': calories += 500; break;
      default: break;
    }

    const protein = Math.round(weight * 1.8);
    const carbCalories = calories * 0.55;
    const carbs = Math.round(carbCalories / 4);
    const fatCalories = calories * 0.25;
    const fat = Math.round(fatCalories / 9);

    return {
      calories: Math.round(calories),
      protein,
      carbs,
      fat
    };
  };

  const handleSaveNutritionGoals = () => {
    if (!gender || !activityLevel || !nutritionGoal) {
      toast.error("Please fill in all nutrition goal details");
      return;
    }

    const recommendations = calculateNutritionRecommendations();
    
    localStorage.setItem('nutritionGoals', JSON.stringify({
      weight,
      height,
      age,
      gender,
      activityLevel,
      nutritionGoal,
      ...recommendations
    }));

    toast.success("Nutrition goals updated successfully!");
  };

  if (!user) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">User not authenticated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email} 
                    placeholder="Your email" 
                    disabled 
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed
                  </p>
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter your current password" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter new password" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm new password" 
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Account Type</p>
                <p className="text-sm text-muted-foreground">Free Plan</p>
              </div>
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">April 15, 2023</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Login</p>
                <p className="text-sm text-muted-foreground">Today at 9:30 AM</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                Logout
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Nutrition Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-4">
                Advanced nutrition preferences will be available in the next update!
              </p>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => toast.info("This feature is coming soon!")}
              >
                Customize Nutrition Goals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Nutrition Goals
              </CardTitle>
              <CardDescription>
                Customize your nutrition recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))} 
                  min={40} 
                  max={200} 
                />
              </div>

              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))} 
                  min={100} 
                  max={250} 
                />
              </div>

              <div className="space-y-2">
                <Label>Age</Label>
                <Input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))} 
                  min={18} 
                  max={100} 
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select 
                  value={gender} 
                  onValueChange={setGender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select 
                  value={activityLevel} 
                  onValueChange={setActivityLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="very">Very Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="extra">Extra Active (very hard exercise & physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nutrition Goal</Label>
                <Select 
                  value={nutritionGoal} 
                  onValueChange={setNutritionGoal}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSaveNutritionGoals} 
                className="w-full"
              >
                Save Nutrition Goals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
