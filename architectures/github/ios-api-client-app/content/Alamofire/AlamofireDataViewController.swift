//
//  AlamofireDataViewController.swift
//  RA_APP
//
//  Created by NimashiF on 2024-11-06.
//

import UIKit

class AlamofireDataViewController: UIViewController {
    
    var apiResult = [Model]()
    @IBOutlet var alamofireDataView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //GET request
        APIFetchHandler.sharedInstance.fetchAPIData{ apiData in
            self.apiResult = apiData
            DispatchQueue.main.async {
                self.alamofireDataView.reloadData()
            }
        }
        
        //POST request
        APIFetchHandler.sharedInstance.postAPIData ()
    }
    
}

extension AlamofireDataViewController: UITableViewDelegate, UITableViewDataSource {
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
