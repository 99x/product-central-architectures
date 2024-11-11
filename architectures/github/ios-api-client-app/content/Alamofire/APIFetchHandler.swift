//
//  APIFetchHandler.swift
//  RA_APP
//
//  Created by NimashiF on 2024-10-23.
//

import Foundation
import Alamofire

//https://www.waldo.com/blog/how-to-use-alamofire
class APIFetchHandler {
    
    static let sharedInstance = APIFetchHandler()
    
    //with params
    //let parameters = ["category": "Movies", "genre": "Action"]
    
    //http GET request
    func fetchAPIData(handler: @escaping (_ apiData:[Model])->(Void)){
        //let url = Constants.Url.baseUrl;
        AF.request(Constants.baseUrl, method: .get, parameters: nil, encoding: URLEncoding.default, headers: nil, interceptor: nil)
            .response{ resp in
                switch resp.result{
                case .success(let data):
                    do{
                        let jsonData = try JSONDecoder().decode([Model].self, from: data!)
                        //print(jsonData)
                        handler(jsonData)
                    } catch {
                        print(error.localizedDescription)
                    }
                case .failure(let error):
                    print(error.localizedDescription)
                }
            }
    }
    
    //http POST request
    func postAPIData() {
        let params: Parameters = [
            "userId": 23,
            "title": "ReactJS Tutorials",
            "body": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        ]
        
        AF.request(Constants.baseUrl, method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).responseData { response in
            switch response.result {
            case .success(let data):
                do {
                    guard let jsonObject = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                        print("Error converting data to JSON object")
                        return
                    }
                    guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                        print("Error converting JSON object to Pretty JSON data")
                        return
                    }
                    guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                        print("Error converting JSON data in String")
                        return
                    }
                    
                    print(prettyPrintedJson)
                } catch {
                    print("Error: Trying to convert JSON data to string")
                    return
                }
            case .failure(let error):
                print(error)
            }
        }
    }
}

