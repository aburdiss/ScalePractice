//
//  ComplicationController.swift
//  ScalePracticeWatch WatchKit Extension
//
//  Created by Alexander Burdiss on 11/25/20.
//

import ClockKit
import SwiftUI

class ComplicationController: NSObject, CLKComplicationDataSource {
  
  // MARK: - Complication Configuration
  
  func getComplicationDescriptors(handler: @escaping ([CLKComplicationDescriptor]) -> Void) {
    let descriptors = [
      CLKComplicationDescriptor(
        identifier: "complication",
        displayName: "Scale Practice",
        supportedFamilies: [
          CLKComplicationFamily.circularSmall,
          CLKComplicationFamily.modularSmall,
          CLKComplicationFamily.utilitarianSmall,
          CLKComplicationFamily.utilitarianSmallFlat,
          CLKComplicationFamily.graphicBezel,
          CLKComplicationFamily.graphicCorner,
          CLKComplicationFamily.graphicCircular,
          CLKComplicationFamily.graphicRectangular,
        ])
      // Multiple complication support can be added here with more descriptors
    ]
    
    // Call the handler with the currently supported complication descriptors
    handler(descriptors)
  }
  
  func handleSharedComplicationDescriptors(_ complicationDescriptors: [CLKComplicationDescriptor]) {
    // Do any necessary work to support these newly shared complication descriptors
  }
  
  // MARK: - Timeline Configuration
  
  func getTimelineEndDate(for complication: CLKComplication, withHandler handler: @escaping (Date?) -> Void) {
    // Call the handler with the last entry date you can currently provide or nil if you can't support future timelines
    handler(nil)
  }
  
  func getPrivacyBehavior(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationPrivacyBehavior) -> Void) {
    // Call the handler with your desired behavior when the device is locked
    handler(.showOnLockScreen)
  }
  
  // MARK: - Timeline Population
  
  func createTimeLineEntry(for complication:CLKComplication, date:Date)-> CLKComplicationTimelineEntry?{
    if let template = createComplicationTemplate(for: complication){
      return CLKComplicationTimelineEntry(date: date, complicationTemplate: template)
    }
    return nil
  }
  
  func getCurrentTimelineEntry(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationTimelineEntry?) -> Void) {
    let timelineEntry = createTimeLineEntry(for: complication, date: Date())
    // Call the handler with the current timeline entry
    handler(timelineEntry)
  }
  
  func getTimelineEntries(for complication: CLKComplication, after date: Date, limit: Int, withHandler handler: @escaping ([CLKComplicationTimelineEntry]?) -> Void) {
    // Call the handler with the timeline entries after the given date
    handler(nil)
  }
  
  // MARK: - Sample Templates
  
  func getLocalizableSampleTemplate(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationTemplate?) -> Void) {
    // This method will be called once per supported complication, and the results will be cached
    handler(createComplicationTemplate(for: complication))
  }
  
  
  /**
   Returns an unstyled image for use in complications
   */
  func image() -> CLKImageProvider {
    return CLKImageProvider(
      onePieceImage: (UIImage(systemName: "music.note")?.withTintColor(.purple))!
    )
  }
  
  /**
   Returns a color image for use in complications
   */
  func colorImage() -> CLKFullColorImageProvider {
    return CLKFullColorImageProvider(
      fullColorImage: (UIImage(systemName: "music.note")?.withTintColor(.purple))!,
      tintedImageProvider: nil
    )
  }
  
  /**
   Takes care of a lot of boilerplate code that is used when making watch complications. Returns template that is used when a complication type is passed in.
   */
  func createComplicationTemplate(for complication:CLKComplication) -> CLKComplicationTemplate! {
    var template:CLKComplicationTemplate? = nil
    
    switch complication.family {
    //MARK: Circular Family
    case .circularSmall:
      template = CLKComplicationTemplateCircularSmallSimpleImage(imageProvider: image())
    //MARK: Modular Family
    case .modularLarge:
      // Don't want to support this
      template = nil
    case .modularSmall:
      template = CLKComplicationTemplateModularSmallSimpleText(textProvider: CLKSimpleTextProvider(text: "C"))
    //MARK:Utilitarian family
    case .utilitarianLarge:
      template = nil
    case .utilitarianSmall:
      template = CLKComplicationTemplateUtilitarianSmallSquare(imageProvider: image())
    case .utilitarianSmallFlat:
      template = CLKComplicationTemplateUtilitarianSmallFlat(textProvider: CLKSimpleTextProvider(text: "Scale Practice"))
    //MARK:Extra large
    // this will default for any watch 3 if Graphcextralarge is used.
    case .extraLarge:
      template = nil
    //MARK:Graphic Family
    case .graphicExtraLarge:
      template = nil
    case .graphicRectangular:
      template = CLKComplicationTemplateGraphicRectangularFullImage(imageProvider: colorImage())
    case .graphicBezel:
      template = CLKComplicationTemplateGraphicBezelCircularText(
        circularTemplate: CLKComplicationTemplateGraphicCircularImage(
          imageProvider: colorImage()
        ),
        textProvider: CLKSimpleTextProvider(text: "Scale Practice", shortText: "Scales")
      )
    case .graphicCircular:
      template = CLKComplicationTemplateGraphicCircularImage(imageProvider: colorImage())
    case .graphicCorner:
      template = CLKComplicationTemplateGraphicCornerTextImage(
        textProvider: CLKSimpleTextProvider(text: "Scale Practice", shortText: "Scales"),
        imageProvider: colorImage()
      )
    default:
      template = nil
      print("complication with raw value \(complication.family) not found")
      
    }
    return template
  }
}
