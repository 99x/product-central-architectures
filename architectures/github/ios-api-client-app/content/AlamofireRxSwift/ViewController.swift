//
//  ViewController.swift
//  RA_APP
//
//  Created by NimashiF on 2024-10-21.
//

import UIKit
import Alamofire
import RxSwift

class ViewController: UIViewController {
    
    var apiResult = [Model]()
    @IBOutlet var apiDataView: UITableView!
    
    let apiService = ApiClient()
    //Dispose bag
    let disposeBag = DisposeBag()

    override func viewDidLoad() {
        super.viewDidLoad()

        apiService.fetchData()
            .subscribe(
                onNext: { response in
                    //print("Data received: \(response)")
                    self.apiResult = response
                    DispatchQueue.main.async {
                        self.apiDataView.reloadData()
                    }
                },
                onError: { error in
                    print("Error occurred: \(error)")
                },
                onCompleted: {
                    print("Request completed")
                }
            )
            .disposed(by: disposeBag)
    }
}

extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return apiResult.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "default_cell")
        else {
            return UITableViewCell()
        }
        cell.textLabel?.text = apiResult[indexPath.row].title
        return cell
    }
}
