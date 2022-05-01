import React from "react";
import { Radio } from "antd";
import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const EditOpenday = observer(
  ({
    openday,
    onChangeMonday,
    onChangeTuesday,
    onChangeWednesday,
    onChangeThursday,
    onChangeFriday,
    onChangeSaturday,
    onChangesunday,
  }) => {
    return (
      <div className="col-span-6 sm:col-span-6">
        <label
          htmlFor="email-address"
          className="block text-sm font-medium text-gray-700"
        >
          เวลาเปิด-ปิดร้าน
        </label>
        <div className="mt-2 bg-white shadow-sm border-gray-300 rounded-md p-3 ">
          <div className="mt-3 mb-2">
            <label
              htmlFor="monday"
              className="block text-sm font-medium text-gray-700"
            >
              วันจันทร์
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeMonday}
              value={openday.monday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.monday.type === "open" && (
              <div className="mt-3">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeMonday}
                  value={openday.monday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeMonday}
                  value={openday.monday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันอังคาร
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeTuesday}
              value={openday.tuesday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.tuesday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeTuesday}
                  value={openday.tuesday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeTuesday}
                  value={openday.tuesday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันพุธ
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeWednesday}
              value={openday.wednesday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.wednesday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeWednesday}
                  value={openday.wednesday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeWednesday}
                  value={openday.wednesday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันพฤหัสบดี
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeThursday}
              value={openday.thursday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.thursday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeThursday}
                  value={openday.thursday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeThursday}
                  value={openday.thursday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันศุกร์
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeFriday}
              value={openday.friday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.friday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeFriday}
                  value={openday.friday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeFriday}
                  value={openday.friday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันเสาร์
            </label>
            <Radio.Group
              name="type"
              onChange={onChangeSaturday}
              value={openday.saturday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.saturday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangeSaturday}
                  value={openday.saturday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangeSaturday}
                  value={openday.saturday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="tuesday"
              className="block text-sm font-medium text-gray-700"
            >
              วันอาทิตย์
            </label>
            <Radio.Group
              name="type"
              onChange={onChangesunday}
              value={openday.sunday.type}
            >
              <Radio value={"open"}>เปิด</Radio>
              <Radio value={"close"}>ไม่เปิด</Radio>
            </Radio.Group>
            {openday.sunday.type === "open" && (
              <div className="mt-2">
                <TextField
                  name="start"
                  id="time"
                  label="เวลาเปิด"
                  type="time"
                  onChange={onChangesunday}
                  value={openday.sunday.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150, marginRight: 2 }}
                />
                <TextField
                  name="end"
                  id="time"
                  label="เวลาปิด"
                  type="time"
                  onChange={onChangesunday}
                  value={openday.sunday.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
export default EditOpenday;
