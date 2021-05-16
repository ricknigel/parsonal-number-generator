import React, { useState } from 'react';
import { NextPage } from 'next';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import format from 'date-fns/format';
import { Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4)
  },
  datePicker: {
    margin: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

class ExtendDateUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'yyyy年 MMM', { locale: this.locale })
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, 'MMMd日', { locale: this.locale })
  }
}

const Index: NextPage = () => {
  const classes = useStyles();
  const [birthday, setBirthDay] = useState<Date | null>(new Date('1970-01-01T00:00:00'));
  const [targetDate, setTargetDate] = useState<Date | null>(new Date());

  const handleBirthdayChange = (date: Date | null) => {
    setBirthDay(date)
  }

  const handleTargetDateChange = (date: Date | null) => {
    setTargetDate(date)
  }

  const calcParsonalYearNumber = () => {
    if (birthday && targetDate) {
      const birthMonth = birthday.getMonth() + 1
      const birthDate = birthday.getDate()
      const targetYear = targetDate.getFullYear()

      let arr = `${birthMonth}${birthDate}${targetYear}`.split('').map(Number)
      let sum: number;
      do {
        sum = arr.reduce((sum, el) => sum + el, 0);
        arr = String(sum).split('').map(Number)

      } while (String(sum).length > 1);

      return sum;
    } else {
      return 0;
    }
  }

  const calcParsonalMonthNumber = () => {
    if (birthday && targetDate) {
      const parsonalYear = calcParsonalYearNumber()
      const targetMonth = targetDate.getMonth() + 1

      let arr = `${parsonalYear}${targetMonth}`.split('').map(Number)
      let sum: number;
      do {
        sum = arr.reduce((sum, el) => sum + el, 0);
        arr = String(sum).split('').map(Number)

      } while (String(sum).length > 1);

      return sum;
    } else {
      return 0;
    }
  }

  const calcParsonalDateNumber = () => {
    if (birthday && targetDate) {
      const parsonalMonth = calcParsonalMonthNumber()

      let arr = `${parsonalMonth}${targetDate.getDate()}`.split('').map(Number)
      let sum: number;
      do {
        sum = arr.reduce((sum, el) => sum + el, 0);
        arr = String(sum).split('').map(Number)

      } while (String(sum).length > 1);

      return sum;
    } else {
      return 0;
    }
  }

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography variant="h6">{'誕生日を選択してください'}</Typography>
      <MuiPickersUtilsProvider utils={ExtendDateUtils} locale={jaLocale}>
        <DatePicker
          className={classes.datePicker}
          disableFuture
          autoOk
          openTo="year"
          label="誕生日"
          variant="inline"
          inputVariant="outlined"
          margin="normal"
          format="yyyy年 M月 d日"
          views={['year', 'month', 'date']}
          value={birthday}
          onChange={handleBirthdayChange}
        />
      </MuiPickersUtilsProvider>
      <Typography variant="h6">{'占いたい年月日を選択してください'}</Typography>
      <MuiPickersUtilsProvider utils={ExtendDateUtils} locale={jaLocale}>
        <DatePicker
          className={classes.datePicker}
          autoOk
          openTo="year"
          label="年"
          variant="inline"
          inputVariant="outlined"
          margin="normal"
          format="yyyy年"
          views={['year']}
          value={targetDate}
          onChange={handleTargetDateChange}
        />
        <DatePicker
          className={classes.datePicker}
          autoOk
          openTo="month"
          label="月"
          variant="inline"
          inputVariant="outlined"
          margin="normal"
          format="M月"
          views={['month']}
          value={targetDate}
          onChange={handleTargetDateChange}
        />
        <DatePicker
          className={classes.datePicker}
          autoOk
          openTo="date"
          label="日"
          variant="inline"
          inputVariant="outlined"
          margin="normal"
          format="d日"
          views={['date']}
          value={targetDate}
          onChange={handleTargetDateChange}
        />
      </MuiPickersUtilsProvider>
      <Divider className={classes.divider} variant="middle" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>結果</Typography>
        </Grid>
        <Grid item　xs={12}>
          <Typography variant="h6" gutterBottom>パーソナル・イヤー・ナンバー</Typography>
          <Typography variant="h5">{calcParsonalYearNumber()}</Typography>
        </Grid>
        <Grid item　xs={12}>
          <Typography variant="h6" gutterBottom>パーソナル・マンス・ナンバー</Typography>
          <Typography variant="h5">{calcParsonalMonthNumber()}</Typography>
        </Grid>
        <Grid item　xs={12}>
          <Typography variant="h6" gutterBottom>パーソナル・デー・ナンバー</Typography>
          <Typography variant="h5">{calcParsonalDateNumber()}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Index;
