//
//  ApiError.swift
//  RA_APP
//
//  Created by NimashiF on 2024-10-25.
//

import Foundation

enum ApiError: Error {
    case forbidden              //Status code 403
    case notFound               //Status code 404
    case conflict               //Status code 409
    case internalServerError    //Status code 500
}
