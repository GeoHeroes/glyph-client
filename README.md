# glyph-client

A native mobile application powered by the glyph-engine library.

To run the development environment application on a native iOS device:

1) Confirm xCode version is 7.0

2) If the following error is encountered:

  "Could not connect to development server. Ensure node server is running. The operation couldn't be completed (NSURLErrorDomain error -1004)".
  
  -Open iOS/AppDelegate.m
  
  -Comment out jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
  
  -Uncomment jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
3) If the following error is encountered:

  "error offline JS file is empty react native"
  
  -If you open the existing main.jsbundle it just throws an error, which is what you're seeing on your device.
  
  -To fix this create a new main.jsbundle.
  
  -From your React project's root (/Project), run the following command in a Terminal shell: react-native bundle --minify. If run successfully it will create a new main.jsbundle and drop it in /Project/iOS/.
  
  =Replace the existing main.jsbundle in /Project/iOS/Project with the one created in /Project/iOS/
  
  
