package com.taiping.insu.jwy.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.transaction.annotation.Transactional;

@Path("/example")
public class ExampleService {

	@GET
	@Path("/test/{id}")
	@Transactional
	public String conditionPost(@PathParam("id") String id) {
		return id;
	}
}
