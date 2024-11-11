//
//  Constants.swift
//  RA_APP
//
//  Created by NimashiF on 2024-10-24.
//

import Foundation

struct Constants {
    
    //The API's base URL
    static let baseUrl = "https://jsonplaceholder.typicode.com/posts"
    
    //The parameters (Queries) that we're gonna use
    struct Parameters {
        static let userId = "userId"
    }
    
    //The header fields
    enum HttpHeaderField: String {
        case authentication = "Authorization"
        case contentType = "Content-Type"
        case acceptType = "Accept"
        case acceptEncoding = "Accept-Encoding"
    }
    
    //The content type (JSON)
    enum ContentType: String {
        case json = "application/json"
    }
}
