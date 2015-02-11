

/**
 * <p>Title: sunny Holiday Company</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * @author Craig Heptinstall
 * @version 1.0
 */

import javax.swing.JOptionPane;
public class Sunny_Holidays
{

public static void main(String args[])

  {

int intNumPass, intTariff, intPassCost;

String strNumPass, strTariff;

JOptionPane.showMessageDialog(null,"Price for seats\n£250 for standard\n£370 for business class\n£450 for first class");

strTariff = JOptionPane.showInputDialog(null, "Enter tariff: ");

strNumPass = JOptionPane.showInputDialog(null,"Enter number of seats");

intNumPass = Integer.parseInt(strNumPass);

intTariff = Integer.parseInt(strTariff);

intPassCost = intNumPass * intTariff;

JOptionPane.showMessageDialog(null, "Cost for the flight is £" + intPassCost);
    }
  }

