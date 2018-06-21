package com.matt.damon.cxf.jax_ws;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;

import com.matt.damon.cxf.webservice.MasterWebService;

public class Client {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
		factory.setAddress("http://localhost:8080/cxf-service/master");
		factory.setServiceClass(MasterWebService.class);
		MasterWebService masterWebService = (MasterWebService) factory.create();
		String response = masterWebService.dictionaries("1234");
		System.out.println(response);
	}

}
