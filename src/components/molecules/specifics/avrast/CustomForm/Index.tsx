'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CaptchaPicture from '@/assets/images/form-captcha.svg';
import Radio from '@/components/atoms/Radio';
import { Attribute } from '@/types/form.type';

interface CustomFormProps {
  title?: string;
  type?: string;
  customFormClassname?: string;
  customFormButtonClassname?: string;
  dataForm?: Attribute[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  withoutSubmit?: boolean;
  resultData?: (
    data: { name: string; value: string }[],
    isValid: boolean
  ) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  type,
  customFormClassname = 'border-b-purple_dark',
  customFormButtonClassname = 'border-purple_dark text-purple_dark',
  dataForm,
  onChange,
  onSubmit,
  withoutSubmit,
  resultData
}) => {
  const handleKeamananOnlineClick = () => {
    window.open('/keamanan-online', '_blank');
  };

  const [formData, setFormData] = useState([{ name: '', value: '' }]);

  const updateFormDataByName = (name: string, value: string) => {
    setFormData((prevData) => {
      const newData = prevData?.map((item) => {
        if (item.name === name) {
          return { ...item, value: value };
        }
        return item;
      });
      return newData;
    });
  };

  useEffect(() => {
    if (dataForm) {
      setFormData(
        dataForm
          ?.filter((data) => data.fieldType !== 'LABEL')
          .map((item) => ({ name: item.name, value: '' }))
      );
    }
  }, [dataForm]);

  useEffect(() => {
    if (resultData) {
      const isValid = formData?.every((item) => {
        if (isRequired(item.name)) {
          return item.value.trim() !== '';
        }
        return true;
      });
      resultData(formData, isValid);
    }
  }, [formData, resultData]);

  const isRequired = (name: string): boolean => {
    const attribute = dataForm?.find((item) => item.name === name);
    return attribute?.config
      ? JSON.parse(attribute.config).required === 'true'
      : false;
  };

  const RenderFetchedForm = () => {
    if (!dataForm) return null;
    const attributeList = dataForm;
    const midIndex = Math.ceil(attributeList.length / 2);

    const leftSide = attributeList.slice(0, midIndex);
    const rightSide = attributeList.slice(midIndex);

    return (
      <div
        className={`${customFormClassname} flex flex-col self-stretch bg-white p-[36px] gap-[36px] border border-gray_light border-b-8 rounded-[12px] rounded-b-[8px]`}
      >
        <p className="font-karla font-bold text-[36px] sm:text-[56px]">
          {title ? title : 'Saya berminat memiliki proteksi ini'}
        </p>
        {type === 'Hubungi Kami' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
            {attributeList?.map((attribute: Attribute, idx) => (
              <div
                key={attribute.id}
                className={`pt-4 ${idx === 0 || attribute.fieldType === 'LABEL' ? 'col-span-2' : ''}`}
              >
                {attribute.fieldType === 'LABEL' ? (
                  <p>{attribute.name}</p>
                ) : (
                  <div>
                    <p className="font-bold">
                      {attribute.name} <span className="text-reddist">*</span>
                    </p>
                    {attribute.fieldType === 'RADIO_BUTTON' ? (
                      <div className="flex flex-row gap-4">
                        {attribute.value
                          ?.split(';')
                          .map((option, optionIndex) => (
                            <Radio
                              key={optionIndex}
                              id={`${attribute.fieldId}_${optionIndex}`}
                              name={attribute.name}
                              label={option}
                              value={option}
                              onChange={(e) =>
                                updateFormDataByName(
                                  attribute.name,
                                  e.target.value
                                )
                              }
                            />
                          ))}
                      </div>
                    ) : attribute.fieldType === 'DROPDOWN' ? (
                      <select
                        onChange={(e) =>
                          updateFormDataByName(attribute.name, e.target.value)
                        }
                        className="w-full px-[16px] py-[10px] border border-purple_dark text-purple_dark rounded-md focus:outline-none focus:border-blue-500"
                      >
                        <option value={''}>Pilih</option>
                        {attribute.value?.split(',').map((option, idx) => (
                          <option
                            key={idx}
                            value={option}
                            selected={
                              option ===
                              formData?.find(
                                (item) => item.name === attribute.name
                              )?.value
                            }
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : attribute.fieldType === 'TEXT_AREA' ? (
                      <div className="flex flex-col justify-end items-end">
                        <textarea
                          className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          placeholder={JSON.parse(attribute.config).placeholder}
                          name={attribute.name}
                          rows={4}
                          maxLength={
                            JSON.parse(attribute.config).max_length === '0'
                              ? 500
                              : JSON.parse(attribute.config).max_length
                          }
                          onChange={(e) =>
                            updateFormDataByName(attribute.name, e.target.value)
                          }
                        />
                        {formData?.find((item) => item.name === attribute.name)
                          ?.value.length +
                          '/' +
                          (JSON.parse(attribute.config).max_length === '0'
                            ? 500
                            : JSON.parse(attribute.config).max_length)}
                      </div>
                    ) : attribute.name.includes('Telepon') ? (
                      <div className="flex justify-between gap-[8px]">
                        <input
                          className="w-1/5 sm:w-1/5 px-[10px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          defaultValue={'+62'}
                          readOnly
                        />
                        <input
                          className="w-4/5 sm:w-4/5 px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          placeholder="Masukan nomor telepon"
                          name={attribute.name}
                          type="number"
                          onChange={(e) =>
                            updateFormDataByName(
                              attribute.name,
                              '+62' + e.target.value
                            )
                          }
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                        placeholder={JSON.parse(attribute.config).placeholder}
                        name={attribute.name}
                        onChange={(e) =>
                          updateFormDataByName(attribute.name, e.target.value)
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : type === 'Form Saran' ? (
          <div className="grid grid-cols-1 gap-[32px]">
            {attributeList?.map((attribute: Attribute) => (
              <div key={attribute.id} className={`pt-4`}>
                {attribute.fieldType === 'LABEL' ? (
                  <p>{attribute.name}</p>
                ) : (
                  <div>
                    <p className="font-bold">
                      {attribute.name} <span className="text-reddist">*</span>
                    </p>
                    {attribute.fieldType === 'RADIO_BUTTON' ? (
                      <div className="flex flex-row gap-4">
                        {attribute.value
                          ?.split(';')
                          .map((option, optionIndex) => (
                            <Radio
                              key={optionIndex}
                              id={`${attribute.fieldId}_${optionIndex}`}
                              name={attribute.name}
                              label={option}
                              value={option}
                              onChange={(e) =>
                                updateFormDataByName(
                                  attribute.name,
                                  e.target.value
                                )
                              }
                            />
                          ))}
                      </div>
                    ) : attribute.fieldType === 'DROPDOWN' ? (
                      <select
                        onChange={(e) =>
                          updateFormDataByName(attribute.name, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-purple_dark text-purple_dark rounded-md focus:outline-none focus:border-blue-500"
                      >
                        <option value={''}>Pilih</option>
                        {attribute.value?.split(',').map((option, idx) => (
                          <option
                            key={idx}
                            value={option}
                            selected={
                              option ===
                              formData?.find(
                                (item) => item.name === attribute.name
                              )?.value
                            }
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : attribute.fieldType === 'TEXT_AREA' ? (
                      <div className="flex flex-col justify-end items-end">
                        <textarea
                          className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          placeholder={JSON.parse(attribute.config).placeholder}
                          name={attribute.name}
                          rows={4}
                          maxLength={
                            JSON.parse(attribute.config).max_length === '0'
                              ? 500
                              : JSON.parse(attribute.config).max_length
                          }
                          onChange={(e) =>
                            updateFormDataByName(attribute.name, e.target.value)
                          }
                        />
                        {formData?.find((item) => item.name === attribute.name)
                          ?.value.length +
                          '/' +
                          (JSON.parse(attribute.config).max_length === '0'
                            ? 500
                            : JSON.parse(attribute.config).max_length)}
                      </div>
                    ) : attribute.name.includes('Telepon') ? (
                      <div className="flex justify-between gap-[8px]">
                        <input
                          className="w-1/5 sm:w-1/5 px-[10px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          defaultValue={'+62'}
                          readOnly
                        />
                        <input
                          className="w-4/5 sm:w-4/5 px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                          placeholder="Masukan nomor telepon"
                          name={attribute.name}
                          type="number"
                          onChange={(e) =>
                            updateFormDataByName(
                              attribute.name,
                              '+62' + e.target.value
                            )
                          }
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                        placeholder={JSON.parse(attribute.config).placeholder}
                        name={attribute.name}
                        onChange={(e) =>
                          updateFormDataByName(attribute.name, e.target.value)
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              {leftSide?.map((attribute: Attribute) => (
                <div key={attribute.id} className="pt-4">
                  <p className="font-bold">
                    {attribute.name} <span className="text-reddist">*</span>
                  </p>
                  {attribute.fieldType === 'RADIO_BUTTON' ? (
                    attribute.value
                      ?.split(';')
                      .map((option, optionIndex) => (
                        <Radio
                          key={optionIndex}
                          id={`${attribute.fieldId}_${optionIndex}`}
                          name={attribute.name}
                          label={option}
                          value={option}
                          onChange={onChange}
                        />
                      ))
                  ) : (
                    <input
                      className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                      placeholder={JSON.parse(attribute.config).placeholder}
                      name={attribute.name}
                      onChange={onChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[4px]">
              {rightSide?.map((attribute: Attribute) => (
                <div key={attribute.id} className="pt-4">
                  <p className="font-bold">
                    {attribute.name} <span className="text-reddist">*</span>
                  </p>
                  {attribute.fieldType === 'RADIO_BUTTON' ? (
                    attribute.value
                      ?.split(';')
                      .map((option, optionIndex) => (
                        <Radio
                          key={optionIndex}
                          id={`${attribute.fieldId}_${optionIndex}`}
                          name={attribute.name}
                          label={option}
                          value={option}
                          onChange={onChange}
                        />
                      ))
                  ) : attribute.name.includes('Telepon') ? (
                    <div className="flex justify-between gap-[8px]">
                      <input
                        className="w-1/5 sm:w-1/5 px-[10px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                        defaultValue={'+62'}
                        readOnly
                      />
                      <input
                        className="w-4/5 sm:w-4/5 px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                        placeholder="Masukan nomor telepon"
                        name={attribute.name}
                        onChange={onChange}
                      />
                    </div>
                  ) : (
                    <input
                      className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                      placeholder={JSON.parse(attribute.config).placeholder}
                      name={attribute.name}
                      onChange={onChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!withoutSubmit && (
          <div className="accent-purple_dark flex flex-row items-start gap-[12px]">
            <input
              id="setuju"
              type="checkbox"
              value=""
              onChange={onChange}
              name="setuju"
              className="mt-[6px] text-purple_dark border-gray_verylight rounded focus:purple_dark focus:ring-2 cursor-pointer"
            />
            <label className="cursor-pointer" htmlFor="setuju">
              Saya setuju memberikan data pribadi Saya kepada Avrist Life
              Insurance dan telah membaca{' '}
              <span
                className="text-purple_dark font-bold"
                onClick={handleKeamananOnlineClick}
              >
                Keamanan Online
              </span>{' '}
              Avrist Life Insurance. Selanjutnya, Saya bersedia untuk dihubungi
              oleh Avrist Life Insurance melalui media komunikasi pribadi Saya
              sesuai hari dan jam operasional yang berlaku di Avrist Life
              Insurance.
            </label>
          </div>
        )}
        {!withoutSubmit && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-[32px]">
            <Image alt="captcha" src={CaptchaPicture} />
            <button
              type="button"
              onClick={onSubmit}
              className={`${customFormButtonClassname} text-[20px] font-semibold h-[64px] px-10 py-3 border-1 rounded-[8px]`}
            >
              <p>Beli Sekarang</p>
            </button>
          </div>
        )}
      </div>
    );
  };

  return !dataForm ? (
    <>
      <div
        className={`${customFormClassname} flex flex-col self-stretch bg-white p-[36px] gap-[36px] border border-gray_light border-b-8 rounded-[12px] rounded-b-[8px]`}
      >
        <p className="font-karla font-bold text-[36px] sm:text-[56px]">
          Saya berminat memiliki proteksi ini
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              Saya adalah <span className="text-reddist">*</span>
            </p>
            <Radio
              id="calon_nasabah"
              name="tipe_nasabah"
              label="Calon Nasabah"
            />
            <Radio id="nasabah" name="tipe_nasabah" label="Nasabah" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              Bapak/Ibu <span className="text-reddist">*</span>
            </p>
            <Radio id="bapak" name="jenis_kelamin" label="Bapak" />
            <Radio id="ibu" name="jenis_kelamin" label="Ibu" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              Alamat Email <span className="text-reddist">*</span>
            </p>
            <input
              className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
              placeholder="Masukan alamat e-mail Anda"
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              Nama <span className="text-reddist">*</span>
            </p>
            <input
              className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
              placeholder="Masukan nama Anda"
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              Kota <span className="text-reddist">*</span>
            </p>
            <input
              className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
              placeholder="Kota terdekat dari domisili Anda"
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">
              No Telepon <span className="text-reddist">*</span>
            </p>
            <div className="flex justify-between gap-[8px]">
              <input
                className="w-1/5 sm:w-1/5 px-[10px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                defaultValue="+62"
                readOnly
              />
              <input
                className="w-4/5 sm:w-4/5 px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]"
                placeholder="Masukan nomor telepon"
              />
            </div>
          </div>
        </div>
        <div className="accent-purple_dark flex flex-row items-start gap-[12px]">
          <input
            id="setuju"
            type="checkbox"
            value=""
            className="mt-[6px] text-purple_dark border-gray_verylight rounded focus:purple_dark focus:ring-2 cursor-pointer"
          />
          <label className="cursor-pointer" htmlFor="setuju">
            Saya setuju memberikan data pribadi Saya kepada Avrist Life
            Insurance dan telah membaca{' '}
            <span className="text-purple_dark font-bold">Keamanan Online</span>{' '}
            Avrist Life Insurance. Selanjutnya, Saya bersedia untuk dihubungi
            oleh Avrist Life Insurance melalui media komunikasi pribadi Saya
            sesuai hari dan jam operasional yang berlaku di Avrist Life
            Insurance.
          </label>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[32px]">
          <Image alt="captcha" src={CaptchaPicture} />
          <button
            type="button"
            className={`${customFormButtonClassname} text-[20px] font-semibold h-[64px] px-10 py-3 border-1 rounded-[8px]`}
          >
            <p>Beli Sekarang</p>
          </button>
        </div>
      </div>
    </>
  ) : (
    dataForm && RenderFetchedForm()
  );
};

export default CustomForm;
