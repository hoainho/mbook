package com.mbook.DAO.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.mbook.DAO.IUserDAO;
import com.mbook.model.UserModel;

public class UserDAO implements IUserDAO {
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
	@Override
	public List<UserModel> findAll() {
		List<UserModel> results = new ArrayList<>();
		Connection connect = getConnection();
		Statement statement = null;
		ResultSet resultSet = null;
		String query = "SELECT * FROM USER";
		if (connect != null) {
			try {
				statement = connect.prepareStatement(query);
				resultSet = statement.executeQuery(query);
				while (resultSet.next()) {
					UserModel user = new UserModel();
					user.setId(resultSet.getLong("id"));
					user.setFullName(resultSet.getString("fullName"));
					user.setUserName(resultSet.getString("userName"));
					user.setPassword(resultSet.getString("password"));
					results.add(user);
				}
				connect.close();
				statement.close();
				resultSet.close();
				System.out.print("Kết quả : " + results);
				return results;
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					if (connect != null && statement != null && resultSet != null) {
						connect.close();
						statement.close();
						resultSet.close();
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

		}
		return null;

	}
}
