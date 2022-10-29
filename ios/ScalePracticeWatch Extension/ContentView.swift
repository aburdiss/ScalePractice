//
//  ContentView.swift
//  ScalePracticeWatch WatchKit Extension
//
//  Created by Alexander Burdiss on 11/25/20.
//

import SwiftUI

struct ContentView: View {
  @State var currentIndex = 0
  @State var alertIsShowing = false
  @State var letterNames = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"]
  
  var body: some View {
    VStack {
      Spacer()
      HStack {
        Spacer()
        Text(letterNames[currentIndex])
          .font(.largeTitle)
        Spacer()
      }
      Spacer()
    }
    .padding(.bottom)
    
    .background(
      LinearGradient(
        gradient: Gradient(
          colors: [
            Color(red: 0.4627450980392157, green: 0.22745098039215686, blue: 0.9647058823529412), 
            Color(red: 0.807843137254902, green: 0.29411764705882354, blue: 0.9647058823529412)
          ]
        ), 
        startPoint: .top, 
        endPoint: .bottom
      )
    )
    .cornerRadius(20)

    Button(action: {
      advanceCounter()
    }) {
      Text("Randomize")
    }
    .accessibility(value: Text("\(letterNames[currentIndex])")
    )
    .onAppear {
      letterNames.shuffle()
      currentIndex = 0
    }
    .alert(isPresented: $alertIsShowing) {
      Alert(
        title: Text("All Scales Practiced"),
        dismissButton: .default(Text("Keep Practicing")){
          currentIndex = 0
          letterNames.shuffle()
        }
      )
    }
  }
  
  func advanceCounter () {
    if ( currentIndex == 11 ) {
      alertIsShowing = true
    } else {
      currentIndex += 1
    }
  }
  
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
