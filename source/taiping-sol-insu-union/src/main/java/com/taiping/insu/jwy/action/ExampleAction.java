package com.taiping.insu.jwy.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.taiping.common.PropertyFileUtil;
import com.taiping.framework.action.BaseAction;

/**
 * 
 *<p>Description : 产品活动Action类</p>
 *<p>Date        : Jul 10, 2013</p>
 *<p>Remark      : 用于展示、获取产品或促销</p>
 * @version		 1.0
 */
@ParentPackage("union")
@Namespace("/example")
public class ExampleAction extends BaseAction {

	private static final long serialVersionUID = 681309269509222788L;

	private Log LOG = LogFactory.getLog(ExampleAction.class);

	private String activityName;

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	@Action(value = "page", results = { @Result(name = "success", location = "/WEB-INF/template/example.ftl", type = "freemarker") })
	public String example() {
		activityName = "测试例子";

		LOG.debug(getText("xwork.default.invalid.fieldvalue"));

		System.out.println(PropertyFileUtil.get("env.name"));
		System.out.println(PropertyFileUtil.get("dev.mode"));

		int[] i = { 1, 2, 3 };
		System.out.println(i[4]);

		return SUCCESS;
	}
}
