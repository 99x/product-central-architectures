//
//  ApiClient.swift
//  RA_APP
//
//  Created by NimashiF on 2024-10-25.
//

import Foundation
import Alamofire
import RxSwift

class ApiClient {
    func fetchData() -> Observable<[Model]> {
        return Observable.create { observer in
            let request = AF.request(Constants.baseUrl)
                .validate()
                .responseDecodable(of: [Model].self) { response in
                    switch response.result {
                    case .success(let data):
                        observer.onNext(data)   // Emit the data to the observer
                        observer.onCompleted()   // Complete the observable
                    case .failure(let error):
                        //Something went wrong, switch on the status code and return the error
                        switch response.response?.statusCode {
                        case 403:
                            observer.onError(ApiError.forbidden)
                        case 404:
                            observer.onError(ApiError.notFound)
                        case 409:
                            observer.onError(ApiError.conflict)
                        case 500:
                            observer.onError(ApiError.internalServerError)
                        default:
                            observer.onError(error)
                        }
                    }
                }
            
            return Disposables.create {
                request.cancel()   // Cancel the request if disposed
            }
        }
    }
}
