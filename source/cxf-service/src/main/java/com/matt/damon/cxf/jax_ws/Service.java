package com.matt.damon.cxf.jax_ws;

import org.apache.cxf.interceptor.LoggingInInterceptor;
import org.apache.cxf.interceptor.LoggingOutInterceptor;
import org.apache.cxf.jaxws.JaxWsServerFactoryBean;

import com.matt.damon.cxf.webservice.MasterWebService;
import com.matt.damon.cxf.webservice.rest.MasterWebServiceImpl;

public class Service {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// 不依赖服务器的方式 发布cxf webservice
		MasterWebService implementor = new MasterWebServiceImpl();
		JaxWsServerFactoryBean svrFactory = new JaxWsServerFactoryBean();
		svrFactory.setServiceClass(MasterWebService.class);
		svrFactory.setAddress("http://localhost:8080/cxf-service/master");
		svrFactory.setServiceBean(implementor);
		svrFactory.getInInterceptors().add(new LoggingInInterceptor());
		svrFactory.getOutInterceptors().add(new LoggingOutInterceptor());
		svrFactory.create();

	}

}
