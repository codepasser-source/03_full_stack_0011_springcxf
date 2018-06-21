package com.matt.damon.cxf.webservice.rest;

import javax.jws.WebService;

import com.matt.damon.cxf.webservice.MasterWebService;

@WebService(endpointInterface = "com.matt.damon.cxf.webservice.MasterWebService")
public class MasterWebServiceImpl implements MasterWebService {

	@Override
	public String dictionaries(String code) {
		System.out.println("dictionaries:" + code);
		return code;
	}

}
