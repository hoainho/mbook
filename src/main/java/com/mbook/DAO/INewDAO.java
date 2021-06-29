package com.mbook.DAO;
import java.util.List;
import com.mbook.model.NewsModel;


public interface INewDAO  extends GenericDAO{
	 List<NewsModel> findAll();
}
