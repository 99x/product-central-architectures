//
//  ViewController.swift
//  PWA App
//
//  Created by NimashiF on 2024-10-08.
//

import UIKit
import WebKit
import Foundation

class ViewController: UIViewController, WKUIDelegate {
    
    @IBOutlet weak var webView: WKWebView!
   
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let url = NSURL(string:Constant.Url.homePage)
        let req = NSURLRequest(url: url! as URL)
        webView.load(req as URLRequest)
        webView.uiDelegate = self
    }
}

extension WKWebView {
    override open var safeAreaInsets: UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    }
}
