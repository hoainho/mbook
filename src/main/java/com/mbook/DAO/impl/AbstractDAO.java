package com.mbook.DAO.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.mbook.DAO.GenericDAO;

public class AbstractDAO implements GenericDAO{
	public Connection getConnection() {
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/mbookDemo";
			//Account-Mysql
			String user = "root";
			String password = "Aa123";
			//
			return DriverManager.getConnection(url, user, password);
		} catch (ClassNotFoundException | SQLException e) {
			return null;
		}
		
	}
}
