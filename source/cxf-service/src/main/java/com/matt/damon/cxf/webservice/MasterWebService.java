package com.matt.damon.cxf.webservice;

import javax.jws.WebService;

@WebService
public interface MasterWebService {

	String dictionaries(String code);

}
